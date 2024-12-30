import { useNavigation } from '@react-navigation/native';
import { Divider, Icon, IconElement, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { TouchableWebElement } from '@ui-kitten/components/devsupport';
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';

interface Props {
    title: string;
    subTitle?: string;
    rightAction?: (vlaue: number) => void;
    rightActionIcon?: string;
    children?: React.ReactNode;
}

export const MainLayout = ({ title, subTitle, rightAction, rightActionIcon, children }: Props) => {
    const { top } = useSafeAreaInsets();
    const { canGoBack, goBack } = useNavigation();

    const renderBackAction = (): TouchableWebElement => (
        <TopNavigationAction icon={<MyIcon name='arrow-back-outline' />} onPress={goBack} />
    );

    const RenderRightAction = () => {
        if (rightAction === undefined || rightActionIcon === undefined) return null;

        return (
            <TopNavigationAction icon={<MyIcon name={rightActionIcon} />} onPress={() => rightAction(1)} onLongPress={() => rightAction(2)} />
        )
    };

    const truncateString = (text: string, maxLength: number, suffix: string = "...") => {
        if (text.length > maxLength) {
          return text.slice(0, maxLength - suffix.length) + suffix;
        }
        return text;
      };


    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation
                title={truncateString(title, 40)}
                subtitle={subTitle}
                alignment='center'
                accessoryLeft={canGoBack() ? renderBackAction : undefined}
                accessoryRight={() => <RenderRightAction />}
            />
            <Divider />


            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>
        </Layout>
    )
}
