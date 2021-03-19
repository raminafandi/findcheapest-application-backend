import csv
import requests
import json

with open('restaurant.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    headers = {'content-type': 'application/json'}
    url = 'http://127.0.0.1:5000/api/restaurants/'

    for row in csv_reader:
        myobj = {"name":row[1],"logo":row[3],"food_type":row[4]}
        x = requests.post(url, data = json.dumps(myobj),headers=headers)
