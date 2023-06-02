package net.khronozz.starwarsarchivebackend.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public abstract class ArchiveDataDTO<T> {
    private String next;
    private T[] results;
    public abstract T[] createArray(int size);
}
