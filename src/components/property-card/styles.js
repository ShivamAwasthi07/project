import COLORS from "../../common/Colors";

export const propertyCardStyles = {
    itemContainer: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 1,
        position: 'relative',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between', // Aligns title to the left and icons to the right
    },
    title: {
        fontSize: 18,
        fontWeight: '300',
        color: COLORS.INFORMATION,
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 50,
    },
    propTitle: {
        color: COLORS.BLACK,
        fontWeight: '500',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    status: {
        fontSize: 12,
        fontWeight: '300',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 12,
        overflow: 'hidden',
        textAlign: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    vacant: {
        color: COLORS.SUCCESS,
        backgroundColor: COLORS.SUCCESS_BG,
    },
    occupied: {
        color: COLORS.ERROR,
        backgroundColor: COLORS.ERROR_BG,
    },
    button: {
        marginTop: 10,
        backgroundColor: COLORS.INFORMATION_BG,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.INFORMATION,
        fontSize: 16,
    },
}