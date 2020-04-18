import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {
  render() {
    const { dataExport } = this.props;
    // console.log(dataExport);
    const dataSet = dataExport.map(item => {
      return {
        question: item.question,
        result: item.result,
        answer_a: item.answer[0],
        answer_b: item.answer[1],
        answer_c: item.answer[2],
        answer_d: item.answer[3],
        answer_e: item.answer[4],
        answer_f: item.answer[5],
        answer_g: item.answer[6],
      }
    }) 
    
    return (
      <ExcelFile>
        <ExcelSheet data={dataSet} name="Sheet1">
          <ExcelColumn label="questions" value="question" />
          <ExcelColumn label="answer_a" value="answer_a" />
          <ExcelColumn label="answer_b" value="answer_b" />
          <ExcelColumn label="answer_c" value="answer_c" />
          <ExcelColumn label="answer_d" value="answer_d" />
          <ExcelColumn label="answer_e" value="answer_e" />
          <ExcelColumn label="answer_f" value="answer_f" />
          <ExcelColumn label="answer_g" value="answer_g" />
          <ExcelColumn label="da" value="result" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
export default Download;
