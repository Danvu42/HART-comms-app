import { StyleSheet, View, Pressable, Text } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from 'react';

export default function ContentCom({ dataBig }) {
    let bouncyCheckboxRef = null;
    const [checkboxState, setCheckboxState] = useState(false);
    let totalReturn = [];
    console.log(dataBig);
    if (dataBig) {
        for (let i = 0; i < dataBig.length; i++) {
            let data = dataBig[i];
            totalReturn.push(
                <View style={styles.container}> <Text style={styles.refNum}>{data.ref_no}</Text>
                    <View style={styles.notes}>
                        <Text style={{color:'#000'}}><Text style={{fontWeight: 'bold'}}>jc_dev_desc:</Text> {data.csc_device_desc}</Text>
                        <Text style={{color:'#000'}}><Text style={{fontWeight: 'bold'}}>jc_category:</Text> {data?.jc_categories}</Text>
                        <Text style={{color:'#000'}}><Text style={{fontWeight: 'bold'}}>jc_notes:</Text> {data?.jc_notes}</Text>
                        <Text style={{color:'#000'}}><Text style={{fontWeight: 'bold'}}>jc_pass:</Text> {data?.jc_pass}</Text>
                        <Text style={{color:'#000'}}><Text style={{fontWeight: 'bold'}}>jc_date:</Text> {data?.jc_note_date}</Text>
                        <Text style={{color:'#000'}}><Text style={{fontWeight: 'bold'}}>jc_ball_in:</Text> {data?.jc_ball_in_court}</Text>
                    </View>
                    <View style={styles.checkbox}>
                        <BouncyCheckbox
                        style={{ left:8}}
                            ref={(ref) => (bouncyCheckboxRef = ref)}
                            isChecked={checkboxState}
                            fillColor="#FFF"
                            iconStyle={{ borderColor: "#000", borderWidth: 3 }}
                            onPress={() => {
                                setCheckboxState(!checkboxState);
                            }} 
                        />
                    </View>
                </View>
            )
        }
    } else {
        console.log('no data');
    }
    return totalReturn;

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: '#FFF',
        borderBottomWidth: 2,
        justifyContent: 'space-between',
        padding: 15,
    },
    refNum: {
        display: 'flex',
        fontSize: 18,
        color: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: '10%',
    },
    notes: {
        backgroundColor: '#FFF',
        borderRadius: 3,
        width: '70%',
        padding: 10,
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
