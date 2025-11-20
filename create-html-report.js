function generateDashboardHTML(data) {
    // Default values for when data is not provided
    const projectName = data?.projectName || "Test Progress Status";
    const startDate = $('Get Data From Google Sheet').first().json['Start Date'] || "";
    const endDate = $('Get Data From Google Sheet').first().json["End Date"] || "";
    const totalTS = $('Get Data From Google Sheet').first().json["Total Test Scenarios"] || "";
    const planned = $('Get Data From Google Sheet').first().json.Planned || "";
    const plannedPercent = $('Get Data From Google Sheet').first().json["Planned (%)"] || "0.00%";

    // Detailed status breakdown
    const pass = $('Get Data From Google Sheet').first().json.Pass || "0";
    const cancelled = $('Get Data From Google Sheet').first().json.Cancelled || "0";
    const executing = $('Get Data From Google Sheet').first().json.Excuting || "0";
    const failed = $('Get Data From Google Sheet').first().json.Failed || "0";
    const deferred = $('Get Data From Google Sheet').first().json.Deferred || "0";
    const block = $('Get Data From Google Sheet').first().json.Block || "0";
    const noRun = $('Get Data From Google Sheet').first().json["No Run"] || "0";
    const completed = $('Get Data From Google Sheet').first().json.Completed || "0";
    const completedPercent = $('Get Data From Google Sheet').first().json["Completed (%)"] || "";
    const productivity = $('Get Data From Google Sheet').first().json.Productivity || "";

    // Status breakdown data
    const completedTotal = $('Get Data From Google Sheet').first().json.Completed || "0";
    const completedTotalPercent = $('Get Data From Google Sheet').first().json["Completed (%)"] || "0";
    const inProgressTotal = $('Get Data From Google Sheet').first().json["In Progress"] || "0";
    const inProgressTotalPercent = $('Get Data From Google Sheet').first().json["In Progress (%)"] || "0";
    const failedTotal = $('Get Data From Google Sheet').first().json.Failed || "0";
    const failedTotalPercent = $('Get Data From Google Sheet').first().json["Failed (%)"] || "0";
    const notStartTotal = Number(block) + Number(noRun);
    const notStartTotalPercent = $('Get Data From Google Sheet').first().json["Not Start (%)"] || "0";

    // Defects and issues (defaulting to 0 as per second template)
    const totalDefects = $('Get Data From Google Sheet').first().json["Total Defect"] || "0";
    const totalIssues = $('Get Data From Google Sheet').first().json["Total Issue"] || "0";

    // Defect breakdown
    const defectInvestigation = $('Get Data From Google Sheet').first().json.Investigation || "0";
    const defectFixing = $('Get Data From Google Sheet').first().json.Fixing || "0";
    const defectDeployment = $('Get Data From Google Sheet').first().json.Deployment || "0";
    const defectRetesting = $('Get Data From Google Sheet').first().json.Retesting || "0";
    const defectClosed = $('Get Data From Google Sheet').first().json.Closed || "0";
    const defectCancelled = $('Get Data From Google Sheet').first().json.Cancelled || "0";

    // Issue breakdown
    const issueInvestigation = $('Get Data From Google Sheet').first().json["Total Issue"] || "0";
    const issueSolved = $('Get Data From Google Sheet').first().json.Solved || "0";

    // Image URL
    const graphImageUrl = "yourImageURLHere";

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Execution Progress Status Dashboard</title>
        <style>
            body 
            {
                margin: 0;
                padding: 0;
                font-family: Sarabun, sans-serif;
                vertical-align: middle;
                text-align: center;
            }

            .container 
            {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
            }

            .header 
            {
                width: 100%;
                margin-bottom: 10px;
            }

            .left-column 
            {
                width: 30%;
                padding-right: 10px;
                box-sizing: border-box;
            }

            .right-column 
            {
                width: 70%;
                box-sizing: border-box;
                margin: auto;
            }

            .main-header-row th {
                text-align: center;
                padding: 10px;
                font-size: 16px;
                font-size: 2.5 vw;
                background-color: rgb(75, 160, 224);
                color: white;
                text-align: center;
                
            }

            table 
            {
                width: 100%;
                table-layout: fixed;
                border-collapse: collapse;
                margin-bottom: 5px;
                border: 1px solid #ddd;
            }

            th
            {
                background-color: rgb(75, 160, 224);
                color: white;
                text-align: center; 
                padding: 6px; 
                font-size: 14px;
                font-size: 2 vw; 
                border: 1px solid #ddd;
                font-weight: normal;
            }

            td 
            {
                border: 1px solid #ddd;
                padding: 6px;
                font-size: 18px;
                font-size: 2.5 vw; 
                font-weight: bold;
                text-align: center; 
            }


            td.normal-text
            {
                font-size: 14px;
                font-size: 2 vw; 
                font-weight: normal;
                text-align: center;
            }

            th.half-width, tr.half-width td 
            {
                width: 50%;
            }
            
            .on-track 
            {
                background-color: #4CAF50;
                color: white;
                text-align: center;
                font-weight: bold;
            }

            .completion-status 
            {
                
                color: white;
                text-align: center;
                font-weight: bold;
            }

            .sub-status-header
            {
                background-color: rgb(142, 124, 195);
            }

            .defect-header 
            {
                background-color:rgb(254, 121, 121);
                color: white;
                text-align: center;
            }

            .issue-header 
            {
                background-color:rgb(115, 71, 159);
                color: white;
                text-align: center;
            }

            .positive-value 
            {
                color: green;
                font-weight: bold;
            }

            .chart-container 
            {
                  width: 100%;
                  height: 350px;
                  margin: 0 auto;
                  border: 1px solid #ffffff;
                  background-color: #FFFFFF;
                  position: relative;
            }

            .chart-placeholder 
            {
                background-color: #ffffff;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
  
                .chart-placeholder img 
                {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    display: block;
                    margin: auto;
                }

            .bottom-tables 
            {
                width: 100%;
                clear: both;
                margin-top: 10px;
                padding-top: 10px;
            }
  
            @media (max-width: 768px) {
                .left-column, .right-column {
                    width: 100%;
                    padding: 0;
                }
            }
        </style>
    </head>
    <body>

        <!-- Main Header -->
        <div class="header">
            <table>
                <tr class="main-header-row">
                    <th colspan="2" >${projectName}</th>
                </tr>
            </table>
        </div>


         <!-- Two-column Layout for Status Tables and Chart -->
        <div style="display: flex; width: 100%; margin-bottom: 10px;">
            <!-- Left Column - Status Tables (30% width) -->
            <div style="width: 30%; box-sizing: border-box;">
                <!-- Completion Status -->
                <table>
                    <tr>
                        <th class="completion-status">Completion Status</th>
                    </tr>
                    <tr>
                        <th class="on-track">On-Track</th>
                    </tr>
                </table>

                <!-- Date Range -->
                <table>
                    <tr>
                        <th class="half-width">Start Date</th>
                        <th class="half-width">End Date</th>
                    </tr>
                    <tr class="half-width">
                        <td class="normal-text">${startDate}</td>
                        <td class="normal-text">${endDate}</td>
                    </tr>
                </table>

                <!-- Test Case Counts -->
                <table>
                    <tr>
                        <th class="half-width">Total Test Scenarios</th>
                        <th class="half-width">Planned</th>
                    </tr>
                    <tr class="half-width">
                        <td>${totalTS}</td>
                        <td>${planned}${plannedPercent ? " (" + plannedPercent + ")" : ""}</td>
                    </tr>
                </table>

                <!-- Productivity -->
                <table class="productivity-table">
                    <tr>
                        <th>Completed</th>
                        <th>Productivity</th>
                    </tr>
                    <tr>
                        <td>${completed}${completedPercent ? " (" + completedPercent + ")" : ""}</td>
                        <td class="positive-value">${productivity}</td>
                    </tr>
                </table>
            </div>

            <!-- Right Column - Chart Area (70% width) -->
            <div class="right-column">
              <div class="chart-container">
                  <div class="chart-placeholder">
                      <img src="${graphImageUrl}"></img>
                  </div>
                  </div>
            </div>


        </div>


        <!-- Bottom tables that span full width -->
        <div class="bottom-tables">
            <table>
                <tr>
                    <th colspan="3">Completed</th>
                    <th colspan="1">In Progress</th>
                    <th colspan="1">Failed</th>
                    <th colspan="2">Not Start</th>
                </tr>
                <tr>
                    <td colspan="3">${completedTotal} (${completedTotalPercent})</td>
                    <td colspan="1">${inProgressTotal} (${inProgressTotalPercent})</td>
                    <td colspan="1">${failedTotal} (${failedTotalPercent})</td>
                    <td colspan="2">${notStartTotal} (${notStartTotalPercent})</td>
                </tr>
                <tr>
                    <th>Pass</th> 
                    <th>Deferred</th>           
                    <th>Cancelled</th>
                    <th>Executing</th>
                    <th>Failed</th>
                    <th>Block</th>
                    <th>No Run</th>
                </tr>
                <tr>
                    <td>${pass}</td>
                    <td>${deferred}</td>
                    <td>${cancelled}</td>
                    <td>${executing}</td>
                    <td>${failed}</td>
                    <td>${block}</td>
                    <td>${noRun}</td>
                </tr>
            </table>

            <!-- Defects and Issues -->
            <table>
                <tr>
                    <th colspan="6" class="defect-header">Total Defects</th>
                    <th colspan="2" class="issue-header">Total Issues</th>
                </tr>
                <tr>
                    <td colspan="6">${totalDefects}</td>
                    <td colspan="2">${totalIssues}</td>
                </tr>
                <tr>
                    <th class="defect-header">Investigation</th>
                    <th class="defect-header">Fixing</th>
                    <th class="defect-header">Deployment</th>
                    <th class="defect-header">Retesting</th>
                    <th class="defect-header">Closed</th>
                    <th class="defect-header">Cancelled</th>
                    <th class="issue-header">Investigation</th>
                    <th class="issue-header">Solved</th>
                </tr>
                <tr>
                    <td>${defectInvestigation}</td>
                    <td>${defectFixing}</td>
                    <td>${defectDeployment}</td>
                    <td>${defectRetesting}</td>
                    <td>${defectClosed}</td>
                    <td>${defectCancelled}</td>
                    <td>${issueInvestigation}</td>
                    <td>${issueSolved}</td>
                </tr>
            </table>   
        </div>
    </body>
</html>`;
}

// The main function that n8n will execute
function executeNode() {
    // Get input data from previous nodes if needed
    const items = $input.all();

    // Extract data from items if available, or use default values
    let data = {};

    // Check if we have items from previous nodes
    if (items && items.length > 0) {
        const item = items[0].json; // Get the first item

        // Map data from the item to our data object
        data = {
            // Project info
            projectName: item.projectName || "Daily Test Execution Progress Report",
            startDate: item.startDate || "",
            endDate: item.endDate || "",

            // Test case data
            totalTS: item.totalTS || "",
            planned: item.planned || "",
            plannedPercent: item.plannedPercent || "",
            completed: item.completed || "",
            completedPercent: item.completedPercent || "",
            productivity: item.productivity || "",

            // Status breakdown
            completedTotal: item.completedTotal || "",
            completedTotalPercent: item.completedTotalPercent || "",
            inProgressTotal: item.inProgressTotal || "",
            inProgressTotalPercent: item.inProgressTotalPercent || "",
            failedTotal: item.failedTotal || "",
            failedTotalPercent: item.failedTotalPercent || "",
            notStartTotal: item.notStartTotal || "",
            notStartTotalPercent: item.notStartTotalPercent || "",

            // Detailed breakdown
            pass: item.pass || "",
            cancelled: item.cancelled || "",
            executing: item.executing || "",
            failed: item.failed || "",
            block: item.block || "",
            noRun: item.noRun || "",

            // Defects and issues
            totalDefects: item.totalDefects || "0",
            totalIssues: item.totalIssues || "0",

            // Defect breakdown
            defectInvestigation: item.defectInvestigation || "0",
            defectFixing: item.defectFixing || "0",
            defectDeployment: item.defectDeployment || "0",
            defectRetesting: item.defectRetesting || "0",
            defectClosed: item.defectClosed || "0",
            defectCancelled: item.defectCancelled || "0",

            // Issue breakdown
            issueInvestigation: item.issueInvestigation || "0",
            issueSolved: item.issueSolved || "0",
        };
    }

    // Generate the HTML dashboard with our data
    const dashboardHTML = generateDashboardHTML(data);

    // Return data to be passed to the next node
    return {
        html: dashboardHTML,
    };
}

// Execute the node and return the result
return executeNode();
