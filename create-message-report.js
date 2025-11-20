const date = new Date();
const thaiDate = date.toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const row = $input.all().find(item => item.json.row_number === 2);
const projName = row?.json?.Project;
const total = row?.json?.Planned || 0;
const completed = row?.json?.Completed || 0;
const percentCompleted = row?.json?.["Completed (%)"] || 0;
const pass = row?.json?.Pass || 0;
const deferred = row?.json?.Deferred || 0;
const cancelled = row?.json?.Cancelled || 0;
const executing = row?.json?.Excuting || 0;
const failed = row?.json?.Failed || 0;
const remaining = row?.json?.["Not start	"] || 0;
const message = `*${projName} Test Execution Progress – ${thaiDate}*\n` +
    `*Total Scenarios: ${total}*\n` +
    `Completed: *${completed} (${percentCompleted})*\n` +
    `- Pass: *${pass}*\n` +
    `- Deferred: *${deferred}*\n` +
    `- Cancelled: *${cancelled}*\n` +
    `In Progress: *${executing}%*\n` +
    `Failed: *${failed}*\n` +
    `Remaining: *${remaining}*\n\n` +
    `*โดย QA และ Dev Team*\n` +
    `--------`;
return [{ json: { message } }];
