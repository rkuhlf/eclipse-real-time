import pandas as pd
import json

everyn = 1

if __name__ == "__main__":
    df = pd.read_csv("./dataparsing/featherweight.csv")
    df = df.reset_index(drop=True)

    outfile = './dataparsing/parsedfeatherweight.json'
    df.to_json(outfile, orient='split')
    # Extract the data and columns from JSON
    with open(outfile, 'r') as f:
        json_dict = json.load(f)

        columns = json_dict['columns']
        data = json_dict['data'][::everyn]
        print(data)

    # Create a dictionary where each column name points to an array of values
    result = {}

    for index, column in enumerate(columns):
        result[column] = [row[index] for row in data]

    # Write the result to a JSON file
    with open(outfile, 'w') as json_file:
        json.dump(result, json_file, indent=4)