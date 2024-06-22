import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

if __name__ == "__main__":
    df = pd.read_csv("./dataparsing/hotfire2data.csv")
    df = df.reset_index(drop=True)

    df["Thrust (lbf)"] += 100 # Offset for the weight of the engine.
    
    plt.plot(df["Time (s)"], df["Chamber (psi)"])
    # plt.plot(df["Time (s)"], df["Thrust (lbf)"])
    plt.show()

    # total_impulse = np.trapz(df['Thrust (lbf)'], x=df['Time (s)'])
    # print(total_impulse)