import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../config/constants'

export function TabBar({
  state,
  navigation,
  descriptors,
}: Readonly<BottomTabBarProps>) {
  return (
    <View style={styles.root}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.tabBarLabel || options.title || route.name
        const isFocused = state.index === index

        const onTabPressHandler = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onTabLongPressHandler = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const icon = options.tabBarIcon
          ? options.tabBarIcon({
              focused: isFocused,
              color: isFocused
                ? globalStyles.colors.steelBlue
                : globalStyles.colors.textLight,
              size: 18,
            })
          : null

        return (
          <View style={styles.tabContainer} key={route.key}>
            <Pressable
              style={styles.button}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onTabPressHandler}
              onLongPress={onTabLongPressHandler}
            >
              {icon}
              <Text
                style={{
                  color: isFocused
                    ? globalStyles.colors.steelBlue
                    : globalStyles.colors.textLight,
                }}
              >
                {label as string}
              </Text>
            </Pressable>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: 60,
    backgroundColor: '#fff',
    shadowColor: '#000', // Shadow color (black) (IOS)
    shadowOffset: { width: 0, height: -2 }, // Shadow offset with a negative y value for the top shadow (IOS)
    shadowOpacity: 0.25, // Shadow opacity (IOS)
    shadowRadius: 5, // Shadow radius (IOS)
    elevation: 10, // (Android)
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabContainer: {
    // backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
  },
})
