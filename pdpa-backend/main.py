from datetime import date
import pandas as pd

from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
import json

from connect import Connect

from pythainlp.tokenize import word_tokenize
from pythainlp.corpus import thai_stopwords, countries, provinces
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
from sklearn.metrics import f1_score
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

import twint


app = FastAPI()
connection = Connect.get_connection()

class User(BaseModel):
    platform: int
    username: str
    first_name: str | None = None
    last_name: str | None = None
    birth_date: date | None = None
    phone_num: str | None = None
    email: EmailStr | None = None


def scrape_tweets(username: str):
    c = twint.Config()
    c.Limit = 20
    c.Username = username
    c.Pandas = True
    twint.run.Search(c)
    return twint.storage.panda.Tweets_df

def read_mongo(db: str, collection: str):
    """ Read from Mongo and store into DataFrame. """
    return pd.DataFrame(list(connection[db][collection].find()))

def tokenize(text: str):
    return word_tokenize(text, keep_whitespace=False)

def vectorize(vectorizer: TfidfVectorizer, texts: pd.Series):
    matrix = vectorizer.transform(texts)
    return pd.DataFrame(matrix.toarray(), columns=vectorizer.get_feature_names_out())

def get_models():
    training_df = read_mongo("training_database", "training_data")
    X_train, X_test, y_train, y_test = train_test_split(training_df["tweet"], training_df["label"], test_size=0.25, random_state=2)

    stop_words = list(thai_stopwords())+list(countries())+list(provinces())
    vectorizer = TfidfVectorizer(tokenizer=tokenize, stop_words=stop_words, ngram_range=(1,2))
    matrix = vectorizer.fit_transform(X_train)
    X_train = pd.DataFrame(matrix.toarray(), columns=vectorizer.get_feature_names_out())

    classifier = LogisticRegression(class_weight="balanced")
    classifier.fit(X_train, y_train)

    X_test = vectorize(vectorizer, X_test)
    y_pred = classifier.predict(X_test)
    y_prob = classifier.predict_proba(X_test)
    print('ROCAUC score:', roc_auc_score(y_test, y_prob, multi_class="ovo"))
    print('Accuracy score:', accuracy_score(y_test, y_pred))
    print('F1 score:', f1_score(y_test, y_pred, average="weighted"))

    return vectorizer, classifier


@app.post("/")
def analyze(user: User):
    tweets_df = scrape_tweets(user.username)
    vectorizer, classifier = get_models()
    X = vectorize(vectorizer, tweets_df["tweet"])
    tweets_df["label"] = classifier.predict(X)
    return json.loads(tweets_df[["tweet", "label"]].to_json(orient='records', force_ascii=False))
