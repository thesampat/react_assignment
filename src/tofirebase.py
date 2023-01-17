import pandas as pd
import os
import firebase_admin
from firebase_admin import credentials, firestore
cred = credentials.Certificate('./myapp-5d8c3-firebase-adminsdk-z5hso-5e9152bbc2.json')

firebase_admin.initialize_app(cred, 
{
"databaseURL": "https://myapp-5d8c3.firebaseio.com/"
})

db = firestore.client()
doc_ref = db.collection(u'applications')

# Import data
df = pd.read_excel('../Full-Stack Developer Assignment/Data.xlsx')

df.Date = df.Date.astype(str)
df.Time = df.Time.astype(str)


tmp = df.to_dict(orient='records')

list(map(lambda x: doc_ref.add(x), tmp))