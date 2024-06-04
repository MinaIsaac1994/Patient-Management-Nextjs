function fetchAll(apiResponse, columns) {
  return apiResponse.map((record) => {
    let mappedRecord = {};
    columns.forEach((column) => {
      if (column.accessorKey === "team") {
        mappedRecord[column.accessorKey] = record.team.name;
      } else if (column.accessorKey === "ward") {
        mappedRecord[column.accessorKey] = record.ward.name;
      } else {
        mappedRecord[column.accessorKey] = record[column.accessorKey];
      }
    });

    // Add the rest of the data to detailPanel
    const detailPanel = {};
    for (const key in record) {
      if (
        !mappedRecord.hasOwnProperty(key) &&
        key !== "team" &&
        key !== "ward"
      ) {
        detailPanel[key] = record[key];
      }
    }

    // Add nested team and ward data to detailPanel
    detailPanel.team = record.team;
    detailPanel.ward = record.ward;

    mappedRecord.detailPanel = detailPanel;

    return mappedRecord;
  });
}

export const PatientModel = {
  fetchAll,
};
