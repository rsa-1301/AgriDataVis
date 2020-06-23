import json
path = r"./Datasets/apy.csv"

import pandas as pd
import numpy as np

data = pd.read_csv(path)
data = np.array(data)
state_list = {}

for k in data:
    if k[0].strip() not in state_list:
        state_list[k[0].strip()] = {}

for state in state_list:
    for k in data:
        if((state == k[0].strip()) and (k[1].strip() not in state_list[state])):
            state_list[state][k[1].strip()] = {}

count = 0
for state in state_list:
    for district in state_list[state]:
        for k in data:
            if((state == k[0].strip()) and (district == k[1].strip()) and not(np.isnan(k[5]) or np.isnan(k[6]))):
                if (k[4].strip() not in state_list[state][district]):
                    state_list[state][district][k[4].strip()] = [[k[2],k[3].strip(),k[5],k[6]]]
                    count+=1
                else:
                    state_list[state][district][k[4].strip()].append([k[2],k[3].strip(),k[5],k[6]])
                    count+=1
# print(state_list)
print(count)
    
with open(r"./assets/datasets/crops.json",'w') as json_file:
    json.dump(state_list,json_file)
