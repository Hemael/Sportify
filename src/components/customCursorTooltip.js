
import { Layer } from 'recharts';

const CustomCursor = (props) => {
  const { points } = props;
  const { x } = points[0];

  // Récupère la taille de la div avec la classe "lineChart"
  const lineChartElement = document.querySelector('.lineChart');
  const lineChartWidth = lineChartElement ? lineChartElement.offsetWidth : 0;
  const lineChartHeight = lineChartElement ? lineChartElement.offsetHeight : 0;

  return (
    <Layer>
      <rect
        x={x} // Position du curseur, aligné avec le point
        y={0}
        width={lineChartWidth - x} // Largeur du rectangle, de x jusqu'à la fin du chart
        height={lineChartHeight}
        fill="#0000000c"
        rx={5} // Appliquer border-radius uniformément
        ry={5}
      />
    </Layer>
  );
};

export default CustomCursor;


const renderTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const LineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'red',
          padding: '5px',
          color: 'white',
          height: '63px',
          width: '39px',
          fontSize: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',

        }}
      >
        <p>{payload[0].value} kg</p>
        <p>{payload[1].value} Kcal</p>
      </div>
    );
  }

  return null;
};

  export { CustomCursor, LineTooltip, renderTooltip };