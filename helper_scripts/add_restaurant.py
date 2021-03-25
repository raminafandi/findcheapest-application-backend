import csv
import requests
import json

with open('restaurants.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    headers = {'content-type': 'application/json'}
    url = 'http://127.0.0.1:5000/api/restaurants/'

    for row in csv_reader:
        # ,title,desc,exp,rating,cuisine_tags,img,url,location,adress,post,more_desc,phone,social_url
        myobj = {"name":row[1],"description":row[2],"food_type":row[5],"logo":row[6],"location":row[9]}
        print(myobj)
        # x = requests.post(url, data = json.dumps(myobj),headers=headers)
