// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SavvagentFlagsExample",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "SavvagentFlagsExample",
            targets: ["SavvagentFlagsExample"]),
    ],
    dependencies: [
        .package(path: "../../packages/ios-sdk")
    ],
    targets: [
        .target(
            name: "SavvagentFlagsExample",
            dependencies: [
                .product(name: "SavvagentFlagsSDK", package: "ios-sdk")
            ]
        )
    ]
)
