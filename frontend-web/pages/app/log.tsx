import React from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../api-functions/defaults";
import { LogList } from "../../components-old/log/log-list.component";
import { useLogEntry } from "../../services/log-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

const Log: React.FC = () => {
  const { logEntries } = useLogEntry();

  return (
    <div className="flow-root m-12">
      <LogList logEntries={logEntries} />
    </div>
  );
};

export default Log;
