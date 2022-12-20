const data = [
    {"New England": ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont"]},
    {"Middle Atlantic": ["Delaware", "Maryland", "New Jersey", "New York", "Pennsylvania"]},
    {"South": ["Alabama", "Arkansas", "Florida", "Georgia", "Kentucky", "Louisiana", "Mississippi", "Missouri", "North Carolina", "South Carolina", "Tennessee", "Virginia", "West Virginia"]},
    {"Midwest": ["Illinois", "Indiana", "Iowa", "Kansas", "Michigan", "Minnesota", "Nebraska", "North Dakota", "Ohio", "South Dakota", "Wisconsin"]},
    {"Southwest": ["Arizona", "New Mexico", "Oklahoma", "Texas"]},
    {"West": ["Alaska", "California", "Colorado", "Hawaii", "Idaho", "Montana", "Nevada", "Oregon", "Utah", "Washington", "Wyoming"]}
]


function test (){
    const list =[]
    data[5]["West"].forEach((state)=>{
        list.push(
            {
                label: state,
                value: { state: state, region: "West" }
            }
        )
    })
    console.log(list);
}

test()