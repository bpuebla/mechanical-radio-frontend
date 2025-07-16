import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#DDB880',
    marginBottom: 20,
    fontFamily: 'Doto-Bold'
  },
  radioDial: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#f5f5f5',
    borderWidth: 5,
    borderColor: '#DDB880',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  radioText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#423D35',
    fontFamily: 'Doto-Bold'
  },
  button: {
    backgroundColor: '#DDB880',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 20,
    color: '#423D35',
    fontFamily: 'Doto-Bold'
  },
  picker: {
    height: 50,
    width: 200,
    color: '#DDB880',
    backgroundColor: '#3F3B33',
  },
  selectedTopic: {
    marginTop: 20,
    fontSize: 18,
    color: '#DDB880',
  },
  input: {
    height: 40,
    borderColor: '#DDB880',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
    color: '#DDB880',
    fontFamily: 'Doto-Regular'
  },
});

export default commonStyles;