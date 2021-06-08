import React from "react";
import { LogList } from "../components/log/log-list.component";
import { useQuery } from "react-query";
import { findAllLogItems } from "../services/log-service";

export default function Log() {
  const { data: entries } = useQuery("log", findAllLogItems);

  return (
    <div className="flow-root m-12">
      <LogList logEntries={entries} />
    </div>
  );
}
