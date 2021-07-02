import React from "react";
import { LogList } from "../components/log/log-list.component";
import { useLogEntry } from "../services/log-service";

const Log: React.FC = () => {
  const { logEntries } = useLogEntry();

  return (
    <div className="flow-root m-12">
      <LogList logEntries={logEntries} />
    </div>
  );
};
export default Log;
