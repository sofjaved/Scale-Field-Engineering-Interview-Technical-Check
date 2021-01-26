# Scale-Field-Engineering-Interview-Technical-Check

[Reflection on future quality checks.](https://docs.google.com/document/d/1FiqnkiXVjJsvFi6cdFsnlTSUslOMWtw-Pkaax5MyKIA/edit?usp=sharing)

Sofia Javed - Scale Field Engineering Interview Technical Check\
Client: **ObserveSign**\
Scale project name: **Traffic Sign Detection**

**Overview:**

**ObserveSign** asked **Scale** to annotate a number of images according to specific guidelines. Scale completed the tasks, but there may be some errors in the annotations.

This script fetches all the completed tasks associated with the project name **“Traffic Sign Detection”** and runs a series of functions to see if the annotations have been completed correctly according to the client’s guidelines. Specifically, this script runs five quality checks:

1)	**Check Box Size** checks the sizes of the bounding boxes in each completed task. If a box is too large and/or takes up most of the image, it may be an error.
2)	**Check Label** checks the labels on the bounding boxes/annotations in each completed task. If a label does not match any of the options listed in the client’s guidelines, it may be an error.
3)	**Check Occlusion** checks the occlusion attribute of the annotations in each completed task. If there is no occlusion percentage annotated, if the occlusion percentage does not match any of the options listed in the client’s guidelines, it may be an error. If the percentage is too high, it may be an error because most of the sign will not be visible.
4)	**Check Truncation** checks the truncation attribute of the annotations in each completed task. If there is no truncation percentage annotated, if the truncation percentage does not match any of the options listed in the client’s guidelines, it may be an error. If the percentage is too high, it may be an error because most of the sign will not be included in the image.
5)	**Check Background Color** checks the background color attribute of the annotations in each completed task. If the background color does not match any of the options listed in the client’s guidelines, it may be an error. Per the client’s guidelines, an annotation with a label of “non_visible_face” must list “not_applicable” as the background color; otherwise, it may be an error.

The script outputs a report in a JSON file (**Traffic_Sign_Detection_Quality_Checks.json**). The report lists the task IDs for which there are certain or potential annotation errors. For each listed task ID, the report lists the quality checks for which there may be errors and for each quality check, the UUIDs of the bounding boxes/annotations that either have *certain errors* – listed as **“errors_uuids”** – or those that have *potential errors* – listed as **“warnings_uuids.”**

To generate a quality checks report for the “Traffic Sign Detection” project, uncomment the following line at the top of the script before running the script:

//qualityChecks(“Traffic Sign Detection");

**NOTE:** The fetch tasks API call displays a maximum of 100 results per page. If the project has more than 100 images/task responses, the code must be adjusted to run the checks for 100 tasks at a time.
