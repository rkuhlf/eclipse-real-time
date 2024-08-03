import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

if __name__ == "__main__":
    df = pd.read_csv("./dataparsing/fullhotfire3data.csv")
    df = df.reset_index(drop=True)

    window_size = 40

    window = np.ones(window_size) / window_size

    # Compute the rolling average using numpy's convolve function
    # rolling_load = np.convolve(df["LC1 Axial Load (lbf)"], window, mode='valid')
    rolling_load = np.convolve(df["b_load_1"], window, mode='valid')

    
    plt.plot(df["Time (s)"][:len(rolling_load)], rolling_load)
    plt.show()

# Need to get the full load cell data that way I can see the total mass change and also the change in the tank mass throughout the burn.