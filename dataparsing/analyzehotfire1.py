import pandas as pd
import matplotlib.pyplot as plt

if __name__ == "__main__":
    df = pd.read_csv("./dataparsing/hotfire1data.csv")
    df = df.reset_index(drop=True)

    
    plt.plot(df["Time (s)"], df["Combustion (psi)"])
    # plt.plot(df["Time (s)"], df["Thrust (lbf)"])
    plt.show()