import React from "react";
import { Select, useSelectInstance } from "../src";

const index = () => {
    const multipleInstance = useSelectInstance();
    const singeInstance = useSelectInstance();
    return (
        <>
            <Select
                mode="multiple"
                instance={multipleInstance}
                selectedValue={[1, 2, 3, 4]}
                repeatTriggerUnselected={false}
                onChange={(_) => {}}
                options={Array.from({ length: 10 }).map((_, index) => {
                    return {
                        node({ isChecked }) {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        multipleInstance.triggerSelect([index]);
                                    }}
                                >
                                    {index}
                                    {JSON.stringify(isChecked)}
                                </div>
                            );
                        },
                        value: index,
                    };
                })}
            />
            <hr />
            <Select
                mode="single"
                instance={singeInstance}
                selectedValue={1}
                repeatTriggerUnselected={false}
                onChange={(_) => {}}
                options={Array.from({ length: 10 }).map((_, index) => {
                    return {
                        node({ isChecked }) {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        singeInstance.triggerSelect(index);
                                    }}
                                >
                                    {index}
                                    {JSON.stringify(isChecked)}
                                </div>
                            );
                        },
                        value: index,
                    };
                })}
            />
        </>
    );
};

export default index;
