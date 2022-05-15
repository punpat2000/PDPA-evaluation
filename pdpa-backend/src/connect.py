from pymongo import MongoClient

class Connect(object):
    @staticmethod    
    def get_connection():
        return MongoClient("mongodb+srv://xlububankx:41xwyt6ohrXkxTWi@cluster0.qjyti.mongodb.net/training_database?retryWrites=true&w=majority")