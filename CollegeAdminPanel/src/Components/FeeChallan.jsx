import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
  },
  collegeHeader: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
},

logo: {
  width: 60,
  height: 60,
},

Name: {
  fontSize: 18,
  fontWeight: 'bold',
},

});

const FeeChallan = ({ data ,Name, CollegePhoto}) => {
  const { studentData, feeData, dateOfIssue } = data;
const excludedKeys = ['_id','CollegeId','createdAt','updatedAt','__v','Course','CourseYear'];
  return (
    <Document>

      <Page size="A4" style={styles.page}>

        <View style={styles.collegeHeader}>
          {CollegePhoto && (
            <Image
               src={`http://localhost:5000/UploadImages/${CollegePhoto}`}
              style={styles.logo}
            />
          )}
          <Text style={styles.Name}>{Name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Fee Challan</Text>
          <Text>Date: {dateOfIssue}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Student Name:{studentData.Name} </Text>
          <Text style={styles.label}>Course: {studentData.Course}</Text>
          <Text style={styles.label}>Year: {studentData.CourseYear}</Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.label}>Fee Breakdown:</Text>
          {Object.entries(feeData)
          .filter(([label]) => !excludedKeys.includes(label))
          .map(([label, value]) => (
            <View style={styles.row} key={label}>
              <Text>{label}</Text>
              <Text> {value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Total Fee: {feeData.TotalFee}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default FeeChallan;