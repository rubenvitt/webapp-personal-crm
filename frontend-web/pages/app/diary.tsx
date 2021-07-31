import React from "react";
import { withAuthenticatedTranslatedServerSideProps } from "../../api-functions/defaults";
import { DiaryList } from "../../components/modules/diary/diary-list.component";
import { useLogEntry } from "../../services/log-service";

export const getServerSideProps = withAuthenticatedTranslatedServerSideProps();

const Diary: React.FC = () => {
  const { logEntries } = useLogEntry();

  return (
    <div className="flow-root m-12">
      <DiaryList logEntries={logEntries} />
    </div>
  );
};

export default Diary;
