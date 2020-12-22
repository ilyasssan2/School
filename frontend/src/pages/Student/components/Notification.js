import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";
import { BellFill } from "react-bootstrap-icons";
import moment from "moment";
function Notification() {
  const { error, loading, fetchData } = useHTTP();
  const [notifations, setNotifations] = useState();
  useEffect(async () => {
    const data = await fetchData("notification");
    setNotifations(data.notifications);
  }, []);
  return (
    <div className="myShadow py-3 bg-white">
      <div className="mx-3 component__icon  ">
        <BellFill size={28} />
      </div>
      <div>
        {notifations &&
          notifations.map((xs) => (
            <div className="notification  px-3">
              <h5 className="notification__tittle">{xs.title}</h5>
              <div className="notification__message">
                {xs.message.substring(0, 110) + "..."}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="notification__date">
                  {moment(xs.createdAt).calendar()}
                </span>
                <span className="notification__link">Read</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Notification;
