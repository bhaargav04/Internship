
import pymysql

dataBase = pymysql.connect(

host = 'localhost',
user = 'root',
password = 'Bhaargav@04',

)

cursorObject = dataBase.cursor()

cursorObject.execute("CREATE DATABASE bhaargav")

print('All Done')