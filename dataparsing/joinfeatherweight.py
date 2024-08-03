import pandas as pd

if __name__ == "__main__":
    altitude = pd.read_csv('./dataparsing/featherweight-altitude.csv')
    longitude = pd.read_csv('./dataparsing/featherweight-longitude.csv')
    latitude = pd.read_csv('./dataparsing/featherweight-latitude.csv')

    merged = pd.merge(altitude, longitude, on="Timestamp", how="outer")
    merged = pd.merge(merged, latitude, on="Timestamp", how="outer")

    merged.rename({
        "Timestamp": "Time (s)"
    })

    merged.to_csv("./featherweight.csv", index=False)