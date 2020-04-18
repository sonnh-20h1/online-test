import React from "react";
import { Button, Icon, Input, Select, Checkbox, Radio } from "antd";
function ExpandedRowRender(props) {
  const { type, Answer } = props.record;
  const value = Answer.filter((item) => item.CORRECT === "true").map((item) => {
    return item.ID_ANS ? item.ID_ANS : item.key;
  });
  console.log(value);

  return (
    <div>
      <div style={{ paddingLeft: "70px" }}>
        <Button type="primary" onClick={props.createRowAnswer}>
          <Icon type="plus" />
          Thêm mới
        </Button>
      </div>
      {type == "2" ? (
        <React.Fragment>
          {Answer.map((item, index) => (
            <div
              key={item.ID_ANS ? item.ID_ANS : item.key}
              className="grid-answers"
            >
              <Checkbox
                defaultChecked={item.CORRECT == "true" ? true : false}
                onChange={(e) =>
                  props.onChangeType(
                    e.target.checked,
                    "checkbox",
                    props.record,
                    index
                  )
                }
              />
              <Input
                placeholder="Câu trả lời"
                defaultValue={item.ANS_TEXT}
                onChange={(event) =>
                  props.onChangeText(event.target.value, props.record, index)
                }
              />
              <Icon
                type="delete"
                theme="twoTone"
                twoToneColor="red"
                onClick={() => props.onDeleteAnswer(props.record, index)}
              />
            </div>
          ))}
        </React.Fragment>
      ) : (
        <Radio.Group value={value[0]}>
          {Answer.map((item, index) => (
            <div
              key={item.ID_ANS ? item.ID_ANS : item.key}
              className="grid-answers"
            >
              <Radio
                value={item.ID_ANS ? item.ID_ANS : item.key}
                onChange={(e) =>
                  props.onChangeType(
                    e.target.checked,
                    "radio",
                    props.record,
                    index
                  )
                }
              />
              <Input
                placeholder="Câu trả lời"
                defaultValue={item.ANS_TEXT}
                onChange={(event) =>
                  props.onChangeText(event.target.value, props.record, index)
                }
              />
              <Icon
                type="delete"
                theme="twoTone"
                twoToneColor="red"
                onClick={() => props.onDeleteAnswer(props.record, index)}
              />
            </div>
          ))}
        </Radio.Group>
      )}
    </div>
  );
}

export default ExpandedRowRender;
