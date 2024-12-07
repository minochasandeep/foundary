import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionCheckboxListProps } from "./types";
import DateControl from "./datecontrol/date-control";

const AccordionCheckboxList: React.FC<AccordionCheckboxListProps> = ({
  title,
  items,
  labelField = "label",
  valueField = "value",
  onChange,
  accordionProps,
  listProps,
  listItemProps,
  disabled,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [allItems, setItems] = useState(items);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setItems(items);
  }, [items]);

  const handleToggle = (value: string) => {
    const item = allItems.find((i) => i[valueField] === value);
    item["isChecked"] = !item["isChecked"];
    setItems([...allItems]);
    onChange(allItems);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    allItems.forEach((x) => {
      x["isChecked"] = event.target.checked;
    });
    setItems([...allItems]);
    onChange(allItems);
  };

  const handleChange = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setShowAll(false);
    }
  };


  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getDate = (date?: string) => {
    if (date == null) return "";
    return date.split("T")[0];
  };

  const visibleItems = showAll ? allItems : allItems.slice(0, 5);

  return (
    <Accordion
      {...accordionProps}
      expanded={expanded}
      onChange={handleChange}
      sx={{
        backgroundColor: (theme) => theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.grey[50],
        boxShadow: "none",
        margin: 0,
        "&:before": { display: "none" },
        "& .MuiAccordionSummary-content": { padding: 0 },
        "&.Mui-expanded": {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "primary.text" }} />}
        sx={{
          backgroundColor: "grey.50",
          "& .MuiAccordionSummary-content": { margin: 0 },
        }}
      >
        <Typography variant="body1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{
        p: 0,
        backgroundColor: (theme) => theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.common.white,
      }}>
        <Box sx={{ px: 1 }}>
          {allItems.length === 0 && (
            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", pb: 2, px: 1 }}
            >
              No data available
            </Typography>
          )}
          {allItems.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={disabled}
                    size="small"
                    sx={{ transform: "scale(0.8)" }}
                    checked={
                      allItems.length > 0 &&
                      allItems.every((x) => x["isChecked"])
                    }
                    onChange={handleSelectAll}
                    indeterminate={
                      allItems.length > 0 &&
                      allItems.indexOf((x: any) => x["isChecked"]) > -1 &&
                      !allItems.every((x) => x["isChecked"])
                    }
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.90rem", color: "grey.800" }}
                  >
                    Select All
                  </Typography>
                }
                sx={{ marginLeft: 0 }}
              />
              <Button
                size="small"
                onClick={() => setShowAll(!showAll)}
                disabled={allItems.length <= 5}
                sx={{
                  textTransform: "none",
                  fontSize: "0.80rem",
                  padding: "1px 4px",
                  color: allItems.length <= 5 ? "grey.400" : "grey.800",
                }}
              >
                {showAll ? "Show Less" : "View All"}
              </Button>

            </Box>
          )}
          <Divider sx={{ mb: 1 }} />
          <List {...listProps} sx={{ maxHeight: "auto", padding: 0 }}>
            {visibleItems.map((item) => (
              <Box
                key={item[valueField]}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ListItem {...listItemProps} sx={{ padding: 0 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        sx={{ transform: "scale(0.8)" }}
                        disabled={disabled}
                        checked={item["isChecked"]}
                        onChange={() => handleToggle(item[valueField])}
                        name={item[labelField]}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {item[labelField]}
                      </Typography>
                    }
                    sx={{ marginLeft: 0 }}
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionCheckboxList;
