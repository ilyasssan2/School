import React, { useEffect, useState } from "react";
import useHTTP from "../../../Shared/useHTTP";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Affix } from "antd";
function Notifications({ match }) {
  const { error, loading, fetchData } = useHTTP();
  const [notifations, setNotifations] = useState();

  const [top, setTop] = useState(95);
  const history = useHistory();
  const id = match.params.id;
  const [notifation, setNotifation] = useState(id ? id : null);
  useEffect(async () => {
    const data = await fetchData("notification");
    setNotifations(data.notifications);
  }, []);
  useEffect(() => {
    if (id && notifations) {
      setNotifation(notifations.find((xs) => xs._id == id));
      console.log("notifation :" + notifation);
    }
  }, [id, notifations]);
  const goToPath = (id) => {
    history.push("/Student/Notifications/" + id);
  };
  return (
    <div className="row">
      <div className="col-lg-7 col-sm-12">
        {notifations &&
          notifations.map((xs) => (
            <div
              className="notification component  px-4 myShadow bg-white mb-3"
              key={xs._id}
              onClick={goToPath.bind(this, xs._id)}
            >
              <h5 className="notification__tittle">{xs.title}</h5>
              <div className="notification__message">
                {xs.message.substring(0, 140) + "..."}
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
      <div className="col-lg-5  col-sm-12">
        {notifation && (
          <Affix offsetTop={top}>
            <div className="notification component px-4 myShadow bg-white s">
              <h5 className="notification__tittle">{notifation.title}</h5>
              <div className="notification__message">{notifation.message}</div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="notification__date">
                  {moment(notifation.createdAt).calendar()}
                </span>
              </div>
            </div>
          </Affix>
        )}
      </div>
    </div>
  );
}

export default Notifications;
