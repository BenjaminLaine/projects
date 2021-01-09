/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memmove.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/17 15:11:06 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:50:27 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	*ft_memmove(void *dest, const void *src, size_t len)
{
	size_t i;

	i = 0;
	if (len > 0 && (dest || src))
	{
		if (dest < src)
			while (len)
			{
				*((char*)dest + i) = *((char*)src + i);
				len--;
				i++;
			}
		else
			while (len--)
				*((char*)dest + len) = *((char*)src + len);
	}
	return (dest);
}
