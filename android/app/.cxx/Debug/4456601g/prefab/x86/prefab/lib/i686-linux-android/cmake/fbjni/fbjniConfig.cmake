if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/ninjaassassin/.gradle/caches/9.0.0/transforms/3adb6efc9a2445a38733a5eba88c31ec/transformed/fbjni-0.7.0/prefab/modules/fbjni/libs/android.x86/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/ninjaassassin/.gradle/caches/9.0.0/transforms/3adb6efc9a2445a38733a5eba88c31ec/transformed/fbjni-0.7.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

