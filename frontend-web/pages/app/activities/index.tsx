import React from "react";
import { ActivityList } from "../../../components/modules/activities/activity-list.component";
import { withPageAuthRequired } from "../../../config/auth0";
import { useLogEntry } from "../../../services/log-service";

export const getServerSideProps = withPageAuthRequired();

const Activities: React.FC = () => {
  const { logEntries } = useLogEntry();

  return (
    <div className="flow-root m-12">
      <ActivityList logEntries={logEntries} />
    </div>
  );
};

export default Activities;
