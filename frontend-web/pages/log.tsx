import React from "react";
import { LogList } from "../components/log/log-list.component";
import { useLogEntry } from "../services/log-service";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Log: React.FC = () => {
  const { logEntries } = useLogEntry();

  return (
    <div className="flow-root m-12">
      <LogList logEntries={logEntries} />
    </div>
  );
};

export default withPageAuthRequired(Log);
