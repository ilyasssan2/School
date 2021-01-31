import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";
import { BellFill } from "react-bootstrap-icons";
import moment from "moment";
import { useHistory } from "react-router-dom";
function Notification() {
  const { error, loading, fetchData } = useHTTP();
  const [notifations, setNotifations] = useState();
  const history = useHistory();
  useEffect(async () => {
    const data = await fetchData("notification");
    setNotifations(data.notifications);
  }, []);
  const goToPath = (id) => {
    history.push("/Student/Notifications/" + id);
  };
  return (
    <div className="myShadow py-4 bg-white component">
      <div className="mx-4 component__icon  ">
        <BellFill size={28} />
      </div>

      <div>
        {notifations &&
          notifations.slice(0, 2).map((xs) => (
            <div
              className="notification  px-4"
              key={xs._id}
              onClick={goToPath.bind(this, xs._id)}
            >
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
