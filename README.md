# H0ck Framework - Converter Tool

Repository for Converter Package with multiple utils for converting some models in to jobs specification that can be executed directly to a H0ck Framework.

  

## Usage

All converters on this repository can be executed with npm. The npx command is the fastest way to execute this operations.
The usage of the command is as follows:  

    npx h0ck-converter <converter> <inputModelPath> <outputFolder>

This command read the model from the specified path and create json and yaml job files in the output folder. The generated JSON file can be sent directly to a H0ck deployed Framework via its Core API to execute the corresponding jobs.

## List of converters available
|Converter| Usage | Requirements |
|--|--|--|
| oasToJob | Convert from Oas model test case to Jobs | None

### OAS
This converter uses a model representing diferent use case real scenarios specifying users amount, types, postman collections and usage percentages and convert it to a multiple Job execution that return the test result and overall API performance.
#### Example model:



    profiles:
        profile1:
            url: "https://www.getpostman.com/collections/d2ab69785f7c0676a820"
        profile2:
            url: "https://www.getpostman.com/collections/4858d331523153ca2b7a"
        profile3:
            url: "https://www.getpostman.com/collections/803aefcd12ef3e8ed5ee"
    scenarios:
        normalUse:
            users:
            - type: pro
                count: 3
                usage:
                - profile1: 0.33
                - profile2: 0.33
                - profile3: 0.34
            - type: normal
                count: 3
                usage:
                - profile1: 0.33
                - profile2: 0.33
                - profile3: 0.34
        heavyLoad:
            users:
            - type: pro
                count: 4
                usage:
                - profile1: 0.1
                - profile2: 0.5
                - profile3: 0.4
            - type: normal
                count: 5
                usage:
                - profile1: 0.1
                - profile2: 0.1
                - profile3: 0.8