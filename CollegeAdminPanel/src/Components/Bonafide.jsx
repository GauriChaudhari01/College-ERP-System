import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  collegeHeader: {
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    objectFit: 'contain',
    marginHorizontal: 'auto',
  },
  collegeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 20,
    lineHeight: 1.6,
    marginBottom: 60,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  column: {
    flex: 1,
    textAlign: 'center',
  },
  leftColumn: {
    textAlign: 'left',
  },
  centerColumn: {
    textAlign: 'center',
    opacity: 0.15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightColumn: {
    textAlign: 'right',
  },
});

const Bonafide = ({ studentData, userData, dateOfIssue, CollegePhoto, CollegeName }) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* College Header */}
        <View style={styles.collegeHeader}>
          {CollegePhoto && (
            <Image
              src={`http://localhost:5000/UploadImages/${CollegePhoto}`}
              style={styles.logo}
            />
          )}
          <Text style={styles.collegeName}>{CollegeName}</Text>
        </View>

        <Text style={styles.header}>Bonafide Certificate</Text>

        {/* Certificate Content */}
        <View style={styles.content}>
          <Text>
            This is to certify that <Text style={{ fontWeight: 'bold' }}>{studentData.Name}</Text>, S/o or D/o{' '}
            <Text style={{ fontWeight: 'bold' }}>{studentData.FatherName || '_____________'}</Text>, is a bonafide student
            of our institution.
          </Text>
          <Text>
            He/She is studying in <Text style={{ fontWeight: 'bold' }}>{studentData.CourseYear}</Text> year of{' '}
            <Text style={{ fontWeight: 'bold' }}>{studentData.Course}</Text> during the academic year{' '}
            <Text style={{ fontWeight: 'bold' }}>{studentData.AcademicYear}</Text>.
          </Text>
          <Text>This certificate is issued on {dateOfIssue} for official purposes.</Text>
        </View>

        {/* Footer with Place, Stamp, and HOD */}
        <View style={styles.footerRow}>
          <View style={[styles.column, styles.leftColumn]}>
            <Text>Place: _________________</Text>
            <Text>Date: {dateOfIssue}</Text>
          </View>

          <View style={[styles.column, styles.centerColumn]}>
            <Text>Institution Stamp</Text>
          </View>

          <View style={[styles.column, styles.rightColumn]}>
            <Text>Head of Department</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Bonafide;
