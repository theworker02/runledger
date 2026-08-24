const HELP = "runledger 1.00 (1.0.0)\n\nUsage:\n  runledger record <cmd> <code>\n  runledger list\n  runledger --help\n  runledger --version\n\nAppend JSONL receipts {ts,cmd,code} to ./.runledger.jsonl.\n\nSubcommands:\n  record   Append one receipt. <cmd> is a string; <code> is an integer exit code.\n  list     Print every receipt as pretty JSON.\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n\nExamples:\n  runledger record \"npm test\" 0\n  runledger record \"npm lint\" 1\n  runledger list\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
