import React, { useEffect, useState } from "react";
import { ArrowRepeat } from "react-bootstrap-icons";
import useHTTP from "../../../Shared/useHTTP";
import AlertForm from "../components/AlertForm";
import * as moment from "moment";
function Alerts() {
  const [open, setOpen] = useState(false);
  const [dataToModel, setDataToModel] = useState({});
  const [notifications, setNotifications] = useState();
  const [notifation, setNotifation] = useState(null);
  const { fetchData } = useHTTP();
  const OpenModal = () => {
    setDataToModel({});
    setOpen(!open);
  };
  const res = async () => {
    const data = await fetchData("notification");
    setNotifications(data.notifications);
    console.log(data.notifications);
  };
  useEffect(() => {
    res();
  }, []);
  return (
    <div>
      <AlertForm DataToModel={dataToModel} OpenModal={OpenModal} open={open} />
      <div className="row">
        <div className="col-lg-7 col-sm-12 ">
          <div className="col-12 component component__spacing">
            <div>
              <button className="btn__icon mr-2" onClick={res}>
                <ArrowRepeat />
              </button>
              <button className="btn__primary" onClick={OpenModal}>
                Add
              </button>
            </div>
            <div className="row">
              <div className="col-12 mt-4">
                {notifications &&
                  notifications.map((xs) => (
                    <div
                      className="notification component  px-4 myShadow bg-white mb-3"
                      key={xs._id}
                      onClick={() => setNotifation(xs)}
                    >
                      <h5 className="notification__tittle">{xs.title}</h5>
                      <div className="notification__message">{xs.message}</div>
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
          </div>
        </div>

        <div className="col-lg-5 col-sm-12  ">
          {notifation && (
            <div className="col-12 component component__spacing myStciky">
              <div className="notification ">
                <h5 className="notification__tittle">{notifation.title}</h5>
                <div className="notification__message">
                  {notifation.message}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="notification__date">
                    {moment(notifation.createdAt).calendar()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
