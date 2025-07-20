# Camera Block Extension for Minecraft Education Edition

[日本語](README_ja.md) | **English**

A MakeCode extension that provides camera control blocks for Minecraft Education Edition, allowing users to create cinematic camera movements and effects through visual programming blocks.

## Features

### 🎬 Camera Control
- **Position Control**: Set camera position with world coordinates
- **Rotation Control**: Set camera pitch and yaw angles
- **Subject Tracking**: Point camera at entities or specific coordinates

### 🎯 Advanced Camera Work
- **Smooth Movements**: Create cinematic camera movements with easing animations
- **28 Easing Types**: Various easing functions (linear, quad, cubic, bounce, elastic, etc.)
- **Customizable Duration**: Set animation time for smooth transitions
- **Auto-Clear**: Automatically return to normal view after camera work

### 🎨 Visual Effects
- **Fade Effects**: Screen fade in/out with customizable colors
- **RGB Color Support**: Full color customization for fade effects
- **Timing Control**: Precise control over fade in, hold, and fade out durations

## Block Categories

### Camera Angles
- **Camera position**: Set camera position
- **Camera position + subject**: Set position and target entity
- **Camera position + coordinates**: Set position and target coordinates
- **Camera position + rotation**: Set position with pitch/yaw angles

### Camera Work
- **Position work**: Smooth movement to position with subject coordinates
- **Subject work**: Smooth movement to position targeting entities
- **Rotation work**: Smooth rotation to specific angles

### Fade
- **Fade**: Screen fade effects with customizable timing and colors
- **RGB color**: Create custom colors for fade effects

## Installation

### Using the Extension in MakeCode

1. Open [Minecraft Education Edition MakeCode Editor](https://minecraft.makecode.com/)
2. Create a new project or open an existing one
3. Click on **Extensions** (gear icon)
4. Click on **Import URL**
5. Enter the repository URL:
   ```
   https://github.com/Mming-Lab/camerablock
   ```

### Using Specific Branches or Versions

To use a specific branch (e.g., for testing new features):
```
https://github.com/Mming-Lab/camerablock#branch-name
```

For example, to use the verification branch:
```
https://github.com/Mming-Lab/camerablock#verification
```

**Note**: 
- Using releases/tags is recommended over branches for stability
- Branch specification feature is still being tested
- Always backup your project before testing with development branches