import React from "react";
import { DiaryList } from "../../components/modules/diary/diary-list.component";
import { withPageAuthRequired } from "../../config/auth0";
import { useLogEntry } from "../../services/log-service";

export const getServerSideProps = withPageAuthRequired();

const Diary: React.FC = () => {
  const { logEntries } = useLogEntry();

  return (
    <div className="flow-root m-12">
      <DiaryList logEntries={logEntries} />
    </div>
  );
};

export default Diary;
