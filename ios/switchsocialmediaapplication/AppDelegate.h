#import <Foundation/Foundation.h>
#import <EXUpdates/EXUpdatesAppController.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
#import <UMCore/UMAppDelegateWrapper.h>

//@property (nonatomic, strong) UIWindow *window;
@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate, EXUpdatesAppControllerDelegate>

@end
