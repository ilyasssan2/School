import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";

function Statistics() {
  const { fetchData } = useHTTP();
  const [statistics, setStatistics] = useState({
    students: null,
    filiers: null,
    groupes: null,
  });
  const getStatis = async () => {
    const data = await fetchData("statict");
    setStatistics(data);
  };
  useEffect(() => {
    getStatis();
  }, []);
  return (
    <div>
      <div className=" statistics">
        <div className="statistic__card ">
          <h5 className="statistic__card__title">Students</h5>
          <h3 className="text-center">{statistics && statistics.students}</h3>
        </div>
        <div className="statistic__card ">
          <h5 className="statistic__card__title">Groupes</h5>
          <h3 className="text-center">{statistics && statistics.groupes}</h3>
        </div>
        <div className="statistic__card ">
          <h5 className="statistic__card__title">Filiers</h5>
          <h3 className="text-center">{statistics && statistics.filiers}</h3>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
