const fetch = require("node-fetch");
const fs = require("fs");

//NOTE: To generate a quality checks report for the Traffic Sign Detection project, uncomment the line below and run the script:
// qualityChecks("Traffic Sign Detection");

//Fetch all tasks in the project, run quality checks, and write results to JSON file:

async function qualityChecks(projectName) {
  try {
    let url = "https://api.scale.com/v1/tasks?project=" + projectName.split(" ").join("%20");
    let result = await fetch(url, {
    "method": "GET",
    "headers": {
      "Authorization": "Basic bGl2ZV83NDI3NWI5YjJiOGI0NGQ4YWQxNTZkYjAzZDIwMDhlZDo="
    }
    });
    result = await result.json();
    let response = runChecks(projectName, result.docs);
    let fileName = projectName.split(" ").join('_') + '_Quality_Checks.json';
    fs.writeFile(fileName, JSON.stringify(response, null, 4), (err) => {
          if (err) {
              console.error(err);
              return;
          };
          console.log(`File has been created: ${fileName}`);
        });
    } catch (error) {
    console.error(error);
  }
}

//Helper functions:

//Run all quality checks for all tasks:

function runChecks(projectName, tasks) {
  let report = {
    projectName: projectName,
    qualityChecks: []
  };
  for(let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    if(singleTaskChecks(task)) {
      report.qualityChecks.push(singleTaskChecks(task));
    };
  }
  return report;
}

//Run all quality checks for a single task:

function singleTaskChecks(task) {
  let singleTaskReport = {};
  let boxes = task.response.annotations;

  //loop through all annotations and run all checks on each:
  for(let i = 0; i < boxes.length; i++) {
    let box = boxes[i];

    //check box size:
    if(checkBoxSize(box)) {
      if(singleTaskReport.task_id === undefined) {
        singleTaskReport.task_id = task.task_id;
      }
      if(singleTaskReport.checkBoxSize !== undefined) {
        if(checkBoxSize(box)[0] === 'warning') {
         if(singleTaskReport.checkBoxSize.warnings_uuids) {
           singleTaskReport.checkBoxSize.warnings_uuids.push(checkBoxSize(box)[1]);
         } else {
          singleTaskReport.checkBoxSize.warnings_uuids = [checkBoxSize(box)[1]];
         }
        }
        if(checkBoxSize(box)[0] === 'error') {
          if(singleTaskReport.checkBoxSize.errors_uuids) {
            singleTaskReport.checkBoxSize.errors_uuids.push(checkBoxSize(box)[1]);
          } else {
           singleTaskReport.checkBoxSize.errors_uuids = [checkBoxSize(box)[1]];
          }
        }
      } else {
        if(checkBoxSize(box)[0] === 'warning') {
          singleTaskReport.checkBoxSize = {
            warnings_uuids: [checkBoxSize(box)[1]]
          }
        }
        if(checkBoxSize(box)[0] === 'error') {
          singleTaskReport.checkBoxSize = {
            errors_uuids: [checkBoxSize(box)[1]]
          }
        }
      }
    }

    //check label:
    if(checkLabel(box)) {
      if(singleTaskReport.task_id === undefined) {
        singleTaskReport.task_id = task.task_id;
      }
      if(singleTaskReport.checkLabel !== undefined) {
        singleTaskReport.checkLabel.errors_uuids.push(checkLabel(box)[1]);
      } else {
        singleTaskReport.checkLabel = {
          errors_uuids: [checkLabel(box)[1]]
        }
      }
    }

    //check occlusion:
    if(checkOcclusion(box)) {
      if(singleTaskReport.task_id === undefined) {
        singleTaskReport.task_id = task.task_id;
      }
      if(singleTaskReport.checkOcclusion !== undefined) {
        if(checkOcclusion(box)[0] === 'warning') {
          if(singleTaskReport.checkOcclusion.warnings_uuids) {
            singleTaskReport.checkOcclusion.warnings_uuids.push(checkOcclusion(box)[1]);
          } else {
            singleTaskReport.checkOcclusion.warnings_uuids = [checkOcclusion(box)[1]];
          }
        }
        if(checkOcclusion(box)[0] === 'error') {
          if(singleTaskReport.checkOcclusion.errors_uuids) {
            singleTaskReport.checkOcclusion.errors_uuids.push(checkOcclusion(box)[1]);
          } else {
            singleTaskReport.checkOcclusion.errors_uuids = [checkOcclusion(box)[1]];
          }
        }
      } else {
        if(checkOcclusion(box)[0] === 'warning') {
          singleTaskReport.checkOcclusion = {
            warnings_uuids: [checkOcclusion(box)[1]]
          }
        }
        if(checkOcclusion(box)[0] === 'error') {
          singleTaskReport.checkOcclusion = {
            errors_uuids: [checkOcclusion(box)[1]]
          }
        }
      }
    }

    //check truncation:
    if(checkTruncation(box)) {
      if(singleTaskReport.task_id === undefined) {
        singleTaskReport.task_id = task.task_id;
      }
      if(singleTaskReport.checkTruncation !== undefined) {
        if(checkTruncation(box)[0] === 'warning') {
          if(singleTaskReport.checkTruncation.warnings_uuids) {
            singleTaskReport.checkTruncation.warnings_uuids.push(checkTruncation(box)[1]);
          } else {
            singleTaskReport.checkTruncation.warnings_uuids = [checkTruncation(box)[1]];
          }
        }
        if(checkTruncation(box)[0] === 'error') {
          if(singleTaskReport.checkTruncation.errors_uuids) {
            singleTaskReport.checkTruncation.errors_uuids.push(checkTruncation(box)[1]);
          } else {
            singleTaskReport.checkTruncation.errors_uuids = [checkTruncation(box)[1]];
          }
        }
      } else {
        if(checkTruncation(box)[0] === 'warning') {
          singleTaskReport.checkTruncation = {
            warnings_uuids: [checkTruncation(box)[1]]
          }
        }
        if(checkTruncation(box)[0] === 'error') {
          singleTaskReport.checkTruncation = {
            errors_uuids: [checkTruncation(box)[1]]
          }
        }
      }
    }

    //check background color:
    if(checkBackgroundColor(box)) {
      if(singleTaskReport.task_id === undefined) {
        singleTaskReport.task_id = task.task_id;
      }
      if(singleTaskReport.checkBackgroundColor !== undefined) {
        singleTaskReport.checkBackgroundColor.errors_uuids.push(checkBackgroundColor(box)[1]);
      } else {
        singleTaskReport.checkBackgroundColor = {
          errors_uuids: [checkBackgroundColor(box)[1]]
        }
      }
    }

 }

  //return a report for one task if there are any warnings or errors:
  if(Object.keys(singleTaskReport).length > 0) {
  return singleTaskReport;
  }
}


//Quality Checks (5):

// (1) If the bounding box takes up most of the image, it may be an error.

function checkBoxSize(box) {
    if(box.width >= 1400 || box.height >= 700) {
      return ['error', box.uuid];
    }
    if(box.width >= 750 && box.width < 1400) {
      return ['warning', box.uuid];
    }
    if(box.height >= 400 && box.height <= 700) {
      return ['warning', box.uuid];
    }
  }

// (2) If label is not included or is not any of the client's given options, it may be an error.

function checkLabel(box) {
  let options = ['traffic_control_sign', 'construction_sign', 'information_sign', 'policy_sign', 'non_visible_face'];
  let label = box.label;
  if(label === undefined) {
    return ['error', box.uuid]
  } else if(!options.includes(label)) {
    return ['error', box.uuid]
  }
}

// (3) If occlusion is not included or percentage is too high, most of the sign is not visible.

function checkOcclusion(box) {
  let options = ['0%', '25%','50%', '75%', '100%'];
  let occlusion = box.attributes.occlusion;
  if(occlusion === undefined || !options.includes(occlusion)) {
    return ['error', box.uuid];
  } else {
    let occlusionNum = Number(occlusion.slice(0, occlusion.length - 1));
      if(occlusionNum >= 75) {
      return ['error', box.uuid];
      }
      if(occlusionNum === 50) {
      return ['warning', box.uuid];
      }
    }
}

// (4) If truncation is not included or percentage is too high, most of the sign is not included in the image.

function checkTruncation(box) {
  let options = ['0%', '25%','50%', '75%', '100%'];
  let truncation = box.attributes.truncation;
  if(truncation === undefined || !options.includes(truncation)) {
    return ['error', box.uuid];
  } else {
    let truncationNum = Number(truncation.slice(0, truncation.length - 1));
    if(truncationNum >= 75) {
      return ['error', box.uuid];
    }
    if(truncationNum === 50) {
      return ['warning', box.uuid];
    }
  }
}

// (5) If background color is not included or is not any of the client's given options, it may be an error.

function checkBackgroundColor(box) {
  let options = ['white', 'red', 'orange', 'green', 'blue', 'other', 'not_applicable'];
  let background_color = box.attributes.background_color;
  if(background_color === undefined) {
    return ['error', box.uuid];
  } else if(!options.includes(background_color)) {
      return ['error', box.uuid];
  } else if(box.label === 'non_visible_face' && background_color !== 'not_applicable') {
    return ['error', box.uuid];
  }
}

