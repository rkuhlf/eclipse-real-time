
const outerRadius = 60;
const radius = 30;
const strokeWidth = 4;

export const VideoLoader = (props: {percentage: number}) => {
    const circumference = 2 * Math.PI * radius;
    const coloredCircumference = props.percentage * circumference;
    // The first part is colored, and the second part is transparent.
    const strokeDashArray = [coloredCircumference, circumference - coloredCircumference];

    return <div style={styles.container}>
    <svg height={outerRadius * 2} width={outerRadius * 2}>
      <circle
        cx={outerRadius}
        cy={outerRadius}
        r={radius}
        stroke="#ccc"
        stroke-width={strokeWidth}
        fill="transparent"
      />
      <circle
        cx={outerRadius}
        cy={outerRadius}
        r={radius}
        stroke="rgb(55,162,235)"
        stroke-width={strokeWidth}
        fill="transparent"
        stroke-dasharray={strokeDashArray.join(",")}
        stroke-dashoffset={circumference / 4}
        stroke-linecap="round"
        style={styles.progressCircle}
      />
    </svg>
    <div style={styles.text}>{Math.round(props.percentage * 100)}%</div>
  </div>
}

const styles = {
    container: {
        position: 'relative',
        display: 'inline-block',
        width: `${outerRadius * 2}px`,
        height: '120px',
      },
      progressCircle: {
        transition: 'stroke-dashoffset 0.5s ease',
      },
      text: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '16px',
        // fontWeight: 'bold',
        color: 'white',
      },    
  };
  