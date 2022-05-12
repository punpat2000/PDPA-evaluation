import pandas as pd
import re
import numpy as np

from fastapi import FastAPI
from pydantic import BaseModel
import json

from connect import Connect

from pythainlp.tokenize import word_tokenize
from pythainlp.corpus import thai_stopwords, countries, provinces
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
# from sklearn.metrics import roc_auc_score
# from sklearn.metrics import f1_score
# from sklearn.metrics import accuracy_score
# from sklearn.model_selection import train_test_split

import twint


app = FastAPI()
connection = Connect.get_connection()

class User(BaseModel):
    #platform: int
    username: str
    first_name: str | None = None
    last_name: str | None = None
    birth_date: str | None = None
    phone_num: str | None = None
    email: str | None = None

def read_mongo(db: str, collection: str):
    """ Read from Mongo and store into DataFrame. """
    return pd.DataFrame(list(connection[db][collection].find()))

def scrape_tweets(username: str):
    c = twint.Config()
    c.Limit = 20
    c.Username = username
    c.Pandas = True
    twint.run.Search(c)
    return twint.storage.panda.Tweets_df

def find_personal(user: User, texts: pd.Series):
    list_labels = []
    for text in texts:
        labels = []
        if first_name_found(user.first_name, text):
            labels.append("first_name")
        if last_name_found(user.last_name, text):
            labels.append("last_name")
        if phone_num_found(user.phone_num, text):
            labels.append("phone_num")
        if birth_date_found(user.birth_date, text):
            labels.append("birth_date")
        if email_found(user.email, text):
            labels.append("email")
        if gender_found(text):
            labels.append("gender")
        if education_found(text):
            labels.append("education")
        if occupation_found(text):
            labels.append("occupation")
        if license_num_found(text):
            labels.append("license_num")
        if account_num_found(text):
            labels.append("account_num")
        if citizen_id_found(text):
            labels.append("citizen_id")
        if card_num_found(text):
            labels.append("card_num")
        if address_found(text):
            labels.append("address")
        if password_found(text):
            labels.append("password")
        list_labels.append(labels)
    return list_labels

def first_name_found(first_name, text: str):
    if first_name == None:
        return False
    return first_name in text

def last_name_found(last_name, text: str):
    if last_name == None:
        return False
    return last_name in text

def phone_num_found(phone_num, text: str):
    if phone_num == None:
        return False
    return phone_num[1:] in ''.join(re.findall("\d+", text))

def birth_date_found(birth_date, text: str):
    if birth_date == None:
        return False
    return birth_date in text

def email_found(email, text: str):
    if email == None:
        return False
    return email in text

def gender_found(text: str):
    return "ชาย" in text or "หญิง" in text

def education_found(text: str):
    return "จบการศึกษา" in text or "เรียนจบ" in text or "จบปริญญา" in text

def occupation_found(text: str):
    return "อาชีพ" in text

def license_num_found(text: str):
    return "เลขทะเบียน" in text or "ป้ายทะเบียน" in text

def account_num_found(text: str):
    return"“เลขที่บัญชี" in text or "เลขบัญชี" in text

def citizen_id_found(text: str):
    return bool(re.search("\b\d{1}[ -]?\d{4}[ -]?\d{5}[ -]?\d{2}[ -]?\d{1}\b", text))

def card_num_found(text: str):
    return bool(re.search("\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b", text))

def address_found(text: str):
    subdistrict_df = read_mongo("training_database", "subdistrict")
    return any("แขวง"+subdistrict in text or "ตำบล"+subdistrict in text for subdistrict in subdistrict_df["name"])

def password_found(text: str):
    return "รหัสผ่าน" in text or "password" in text or "PIN" in text


def tokenize(text: str):
    return word_tokenize(text, keep_whitespace=False)

def vectorize(vectorizer: TfidfVectorizer, texts: pd.Series):
    return vectorizer.transform(texts)

def get_models():
    training_df = read_mongo("training_database", "training_data")
    # training_df, testing_df = train_test_split(training_df, test_size=0.3, random_state=1)
    stop_words = list(thai_stopwords())+list(countries())+list(provinces())

    training_df_1 = training_df.copy()
    training_df_1.loc[training_df["label"] != "none", "label"] = "contain"
    X_train_1, y_train_1 = training_df_1["tweet"], training_df_1["label"]
    vectorizer_1 = TfidfVectorizer(tokenizer=tokenize, stop_words=stop_words, ngram_range=(1,2))
    matrix_train_1 = vectorizer_1.fit_transform(X_train_1)

    classifier_1 = LogisticRegression(class_weight="balanced")
    classifier_1.fit(matrix_train_1, y_train_1)

    training_df_2 = training_df[training_df["label"] != "none"]
    X_train_2, y_train_2 = training_df_2["tweet"], training_df_2["label"]
    vectorizer_2 = TfidfVectorizer(tokenizer=tokenize, stop_words=stop_words, ngram_range=(1,2))
    matrix_train_2 = vectorizer_2.fit_transform(X_train_2)

    classifier_2 = LogisticRegression(class_weight="balanced")
    classifier_2.fit(matrix_train_2, y_train_2)

    # X_test_1 = vectorizer_1.transform(testing_df["tweet"])
    # testing_df["predict"] = classifier_1.predict(X_test_1)
    # testing_df_drop = testing_df[testing_df["predict"] == "contain"]
    # X_test_2 = vectorizer_2.transform(testing_df_drop["tweet"])
    # testing_df_drop["predict"] = classifier_2.predict(X_test_2)
    # final_df = pd.concat([testing_df[testing_df["predict"] == "none"], testing_df_drop])
    # print('Accuracy score:', accuracy_score(final_df["label"], final_df["predict"]))
    # print('F1 score:', f1_score(final_df["label"], final_df["predict"], average="weighted"))

    return vectorizer_1, classifier_1, vectorizer_2, classifier_2


@app.post("/")
def analyze(user: User):
    #if user.platform == 0:
    tweets_df = scrape_tweets(user.username)
    content_df = tweets_df.rename(columns={"tweet": "content"})
    content_df["labels"] = find_personal(user, content_df["content"])
    vectorizer_1, classifier_1, vectorizer_2, classifier_2 = get_models()
    X_1 = vectorizer_1.transform(content_df["content"])
    content_df["predict"] = classifier_1.predict(X_1)
    content_df_drop = content_df[content_df["predict"] == "contain"]
    X_2 = vectorizer_2.transform(content_df_drop["content"])
    content_df_drop["predict"] = classifier_2.predict(X_2)
    final_df = pd.concat([content_df[content_df["predict"] == "none"], content_df_drop])
    #final_df.loc[final_df["predict"] == "none", "predict"] = None
    #print(final_df["predict"])
    #print(final_df["labels"])
    final_df["labels"] = final_df.apply(lambda x: np.append(x["labels"], x["predict"]) if x["predict"] != "none" else x["labels"], axis=1)
    #print(final_df["labels"])
    return json.loads(final_df[["date", "content", "labels"]].to_json(orient='records', force_ascii=False))
