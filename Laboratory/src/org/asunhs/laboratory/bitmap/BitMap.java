package org.asunhs.laboratory.bitmap;

import java.util.Arrays;

import freemarker.template.utility.StringUtil;

public class BitMap {
	
	public final byte BIT = 1;
	public final byte ZERO = 0;
	
	private final byte MASK = -1;
	
	/**
	 *  length : number of total bit
	 */
	public final int length;
	
	/**
	 *  size   : length of byte array
	 */
	public final int size;
	
	private byte[] bitmap;
	
	public BitMap(int length) {
		this.length = length;
		this.size = ((this.length - 1) / Byte.SIZE) + 1;
		this.bitmap = new byte[this.size];
		initMap();
	}
	
	public BitMap(byte[] bitmap) {
		this.length = bitmap.length * Byte.SIZE;
		this.size = bitmap.length;
		this.bitmap = Arrays.copyOfRange(bitmap, 0, this.size);
	}
		
	private void initMap() {
		for (int index = size; index-- != 0;) {
			this.bitmap[index] = (byte) 0x00;
		}
	}
	
	private void validate(int pos) {
		if (pos < 0 || pos >= length) {
			throw new ArrayIndexOutOfBoundsException();
		}
	}
	
	private int getindex(int pos){ return pos / Byte.SIZE; }
	private int getpos(int pos)  { return BIT << (Byte.SIZE - pos % Byte.SIZE); }
	
	
	
	
	/**
	 * set bit
	 * @param pos  one-based position
	 */
	public void set(int pos) {
		validate(pos);
		bitmap[getindex(pos)] |= getpos(pos);
	}
	
	/**
	 * reset bit
	 * @param pos  one-based position
	 */
	public void reset(int pos) {
		validate(pos);
		bitmap[getindex(pos)] &= getpos(pos) ^ MASK;
	}
	
	/**
	 * if set, return true.
	 * @param pos  one-based position
	 */
	public boolean isSet(int pos) {
		validate(pos);
		return (bitmap[getindex(pos)] & getpos(pos)) != ZERO;
	}
	
	/**
	 * return bit.
	 * @param pos  one-based position
	 */
	public byte get(int pos) {
		return isSet(pos) ? BIT : ZERO;
	}
	
	public boolean equals(BitMap arg) {
		if (length != arg.length) return false;

		// TODO
		
		return false;
	}
	
	
	
	
	

	public String toBinaryString() {
		StringBuffer sb = new StringBuffer(length + size);

		String binaryString;
		for (int index = 0; index < size; ++index) {
			binaryString = StringUtil.leftPad(Integer.toBinaryString(bitmap[index]),Byte.SIZE,"0");
			sb.append(" ").append(binaryString.substring(binaryString.length() - Byte.SIZE));
		}
		
		return sb.length() > 0 ? sb.toString().substring(1) : "";
	}
	
	public String toString() {
		StringBuffer sb = new StringBuffer((Byte.SIZE + 1) * size);

		for (int index = 0; index < size; ++index) {
			sb.append(" ").append(String.format("%02x",bitmap[index]));
		}

		return sb.length() > 0 ? sb.toString().substring(1) : "";
	}
}
