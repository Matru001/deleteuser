import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Filter = ({ details, style,  }) => {
  return (
    <div style={{ marginTop: 10, marginLeft: 10 }}>
      <Stack spacing={2} direction="row">
        <Button variant="contained"  style={style}>
          {details}
        </Button>
      </Stack>
    </div>
  );
};

export default Filter;
